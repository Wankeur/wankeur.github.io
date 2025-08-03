import React, { useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/integrations/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'

interface AdminDashboardProps {
  user: User
  userProfile: any
}

export default function AdminDashboard({ user, userProfile }: AdminDashboardProps) {
  const [pendingUsers, setPendingUsers] = useState<any[]>([])
  const [allUsers, setAllUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching users:', error)
        return
      }

      setAllUsers(data || [])
      setPendingUsers(data?.filter(user => user.status === 'pending') || [])
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUserStatusChange = async (userId: string, newStatus: 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ status: newStatus })
        .eq('user_id', userId)

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update user status",
          variant: "destructive"
        })
        return
      }

      toast({
        title: "Success",
        description: `User ${newStatus} successfully`,
      })

      fetchUsers()
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred",
        variant: "destructive"
      })
    }
  }

  const handleSignOut = () => {
    supabase.auth.signOut()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen hero-gradient">
      {/* Navigation */}
      <nav className="bg-card/10 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="font-bold text-xl accent-gradient bg-clip-text text-transparent">
              DÆDALE Admin
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Admin: {userProfile?.first_name || user.email}
              </span>
              <Button variant="outline" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        {/* Pending Users Section */}
        <Card className="mb-8 shadow-card">
          <CardHeader>
            <CardTitle>Pending User Approvals ({pendingUsers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {pendingUsers.length === 0 ? (
              <p className="text-muted-foreground">No pending users to review.</p>
            ) : (
              <div className="space-y-4">
                {pendingUsers.map((pendingUser) => (
                  <div 
                    key={pendingUser.id} 
                    className="flex items-center justify-between p-4 bg-muted rounded-lg"
                  >
                    <div>
                      <h3 className="font-semibold">
                        {pendingUser.first_name} {pendingUser.last_name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{pendingUser.email}</p>
                      <p className="text-xs text-muted-foreground">
                        Registered: {new Date(pendingUser.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleUserStatusChange(pendingUser.user_id, 'approved')}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleUserStatusChange(pendingUser.user_id, 'rejected')}
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* All Users Section */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>All Users ({allUsers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {allUsers.map((userItem) => (
                <div 
                  key={userItem.id} 
                  className="flex items-center justify-between p-4 bg-muted rounded-lg"
                >
                  <div>
                    <h3 className="font-semibold">
                      {userItem.first_name} {userItem.last_name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{userItem.email}</p>
                    <p className="text-xs text-muted-foreground">
                      Role: {userItem.role} | Status: {userItem.status}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      userItem.status === 'approved' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : userItem.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {userItem.status}
                    </span>
                    {userItem.status !== 'approved' && (
                      <Button
                        size="sm"
                        onClick={() => handleUserStatusChange(userItem.user_id, 'approved')}
                      >
                        Approve
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}