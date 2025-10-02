import { Todo } from '@/types';
import { motion } from 'framer-motion';

interface TodoStatsProps {
  todos: Todo[];
}

const StatCard = ({
  title,
  value,
  icon,
  gradient,
  delay = 0
}: {
  title: string,
  value: number | string,
  icon: string,
  gradient: string,
  delay?: number
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ scale: 1.03, y: -5 }}
    className={`relative overflow-hidden rounded-2xl p-4 sm:p-5 shadow-lg ${gradient} text-white`}
  >
    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
    <div className="relative z-10 flex items-center justify-between">
      <div>
        <div className="text-2xl sm:text-3xl font-bold">{value}</div>
        <div className="text-sm font-medium opacity-90">{title}</div>
      </div>
      <div className="text-4xl opacity-90">{icon}</div>
    </div>
  </motion.div>
);

const ProgressRing = ({ progress, size = 60, strokeWidth = 6 }: { progress: number, size?: number, strokeWidth?: number }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="white"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
        {progress}%
      </div>
    </div>
  );
};

export default function TodoStats({ todos }: TodoStatsProps) {
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  const active = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-4 gap-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <StatCard
        title="Total Tugas"
        value={total}
        icon="📋"
        gradient="bg-gradient-to-br from-blue-500 to-blue-600"
        delay={0.1}
      />
      <StatCard
        title="Sedang Aktif"
        value={active}
        icon="⏳"
        gradient="bg-gradient-to-br from-yellow-500 to-yellow-600"
        delay={0.2}
      />
      <StatCard
        title="Selesai"
        value={completed}
        icon="✅"
        gradient="bg-gradient-to-br from-green-500 to-green-600"
        delay={0.3}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        whileHover={{ scale: 1.03, y: -5 }}
        className="relative overflow-hidden rounded-2xl p-4 sm:p-5 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white flex flex-col items-center justify-center"
      >
        <div className="text-sm font-medium opacity-90 mb-2">Progress</div>
        <ProgressRing progress={completionRate} />
      </motion.div>
    </motion.div>
  );
}
