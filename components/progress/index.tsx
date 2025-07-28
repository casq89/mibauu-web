type ProgressProps = {
  color: string;
};

export const Progress = ({ color = 'bg-white' }: ProgressProps) => (
  <div className="flex items-center justify-center space-x-1 mt-2 mb-2 ml-3 mr-3">
    <div
      className={`w-2 h-2 ${color} rounded-full animate-bounce [animation-delay:-0.3s]`}
    ></div>
    <div
      className={`w-2 h-2 ${color} rounded-full animate-bounce [animation-delay:-0.15s]`}
    ></div>
    <div className={`w-2 h-2 ${color} rounded-full animate-bounce`}></div>
  </div>
);
