interface SkillBadgeProps {
  skill: string;
  variant?: "default" | "featured";
}

const SkillBadge = ({ skill, variant = "default" }: SkillBadgeProps) => {
  return (
    <span 
      className={`
        inline-block px-4 py-2 rounded-full text-sm font-medium smooth-transition
        ${variant === "featured" 
          ? "gradient-primary text-primary-foreground glow-effect" 
          : "bg-secondary text-secondary-foreground hover:bg-primary/20 hover:text-primary"
        }
      `}
    >
      {skill}
    </span>
  );
};

export default SkillBadge;