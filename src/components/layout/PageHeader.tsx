import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  className?: string;
}

export function PageHeader({ title, subtitle, className = '' }: PageHeaderProps) {
  return (
    <div className={`flex flex-col gap-1 md:gap-2 ${className}`}>
      <motion.h1
        className="text-2xl md:text-3xl font-orbitron smartmate-text-gradient glow-effect"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold">{title}</h1>
      </motion.h1>
      {subtitle && <p className="text-sm md:text-base text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

export default PageHeader;
