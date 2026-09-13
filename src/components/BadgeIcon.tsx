import React from 'react';
import {
  Trophy,
  Zap,
  Award,
  Crown,
  Sparkles,
  Clock,
  Target,
  ShieldCheck,
  Compass,
  Medal,
  Lock,
} from 'lucide-react';
import { BadgeTier } from '../types';
import { getTierStyle } from '../utils/badges';

interface BadgeIconProps {
  iconName: string;
  tier: BadgeTier;
  isUnlocked: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showGlow?: boolean;
}

export const BadgeIcon: React.FC<BadgeIconProps> = ({
  iconName,
  tier,
  isUnlocked,
  size = 'md',
  showGlow = true,
}) => {
  const style = getTierStyle(tier);

  const renderIcon = () => {
    const iconProps = {
      className: `${size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-6 h-6' : size === 'lg' ? 'w-8 h-8' : 'w-12 h-12'} ${
        isUnlocked ? style.textColor : 'text-slate-500'
      }`,
    };

    switch (iconName) {
      case 'Award':
        return <Award {...iconProps} />;
      case 'Zap':
        return <Zap {...iconProps} />;
      case 'Crown':
        return <Crown {...iconProps} />;
      case 'Sparkles':
        return <Sparkles {...iconProps} />;
      case 'Clock':
        return <Clock {...iconProps} />;
      case 'Target':
        return <Target {...iconProps} />;
      case 'ShieldCheck':
        return <ShieldCheck {...iconProps} />;
      case 'Compass':
        return <Compass {...iconProps} />;
      case 'Medal':
        return <Medal {...iconProps} />;
      case 'Trophy':
      default:
        return <Trophy {...iconProps} />;
    }
  };

  const containerSizes = {
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-12 h-12 rounded-xl',
    lg: 'w-16 h-16 rounded-2xl',
    xl: 'w-24 h-24 rounded-3xl',
  };

  return (
    <div
      className={`relative flex items-center justify-center shrink-0 border ${containerSizes[size]} ${
        isUnlocked
          ? `${style.badgeBg} ${style.badgeBorder} ${showGlow ? style.glow : ''}`
          : 'bg-slate-900/80 border-slate-800 text-slate-500'
      }`}
    >
      {renderIcon()}
      {!isUnlocked && (
        <div className="absolute -bottom-1 -right-1 p-0.5 sm:p-1 bg-slate-950 rounded-full border border-slate-700 text-slate-400">
          <Lock className={size === 'sm' ? 'w-2.5 h-2.5' : 'w-3 h-3'} />
        </div>
      )}
    </div>
  );
};
