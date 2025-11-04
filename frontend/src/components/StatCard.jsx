export const StatCard = ({ title, value, icon: Icon, color = 'primary', trend }) => {
  const colorClasses = {
    success: 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800',
    warning: 'bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800',
    danger: 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800',
    primary: 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800'
  };
  
  const iconColorClasses = {
    success: 'text-green-600 dark:text-green-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    danger: 'text-red-600 dark:text-red-400',
    primary: 'text-blue-600 dark:text-blue-400'
  };
  
  return (
    <div className={`rounded-xl border p-6 shadow-card transition-all hover:shadow-lg ${
      colorClasses[color]
    }`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {trend && (
            <p className="text-xs text-muted-foreground mt-2">{trend}</p>
          )}
        </div>
        {Icon && (
          <div className={`p-3 rounded-lg ${iconColorClasses[color]}`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  );
};
