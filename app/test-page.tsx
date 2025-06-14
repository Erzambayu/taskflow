'use client';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <span className="text-2xl">✨</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            TaskFlow Test
          </h1>
          <p className="text-gray-600">Testing Tailwind CSS</p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
          <h2 className="text-xl font-semibold mb-4">Tailwind Test</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-100 p-4 rounded-xl">
              <div className="text-2xl font-bold text-blue-600">Test 1</div>
              <div className="text-sm text-gray-600">Blue Card</div>
            </div>
            <div className="bg-green-100 p-4 rounded-xl">
              <div className="text-2xl font-bold text-green-600">Test 2</div>
              <div className="text-sm text-gray-600">Green Card</div>
            </div>
            <div className="bg-purple-100 p-4 rounded-xl">
              <div className="text-2xl font-bold text-purple-600">Test 3</div>
              <div className="text-sm text-gray-600">Purple Card</div>
            </div>
            <div className="bg-pink-100 p-4 rounded-xl">
              <div className="text-2xl font-bold text-pink-600">Test 4</div>
              <div className="text-sm text-gray-600">Pink Card</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 