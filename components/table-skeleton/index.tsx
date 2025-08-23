export const TableSekeleton = () => (
  <div className="p-3">
    <div className="w-full overflow-hidden rounded-2xl border border-gray-700 shadow-sm animate-pulse">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <tbody className="divide-y divide-gray-700 bg-gray-800">
            {[...Array(12)].map((_, i) => (
              <tr key={i}>
                <td className="px-4 py-3">
                  <div className="w-16 h-4 bg-gray-600 rounded" />
                </td>
                <td className="px-4 py-3">
                  <div className="w-32 h-4 bg-gray-500 rounded" />
                </td>
                <td className="px-4 py-3">
                  <div className="w-64 h-4 bg-gray-600 rounded mb-1" />
                  <div className="w-40 h-4 bg-gray-700 rounded" />
                </td>
                <td className="px-4 py-3">
                  <div className="w-20 h-6 bg-gray-600 rounded-full" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
