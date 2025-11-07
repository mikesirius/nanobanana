"use client"

export default function Showcase() {
  const examples = [
    {
      title: "Ultra-Fast Mountain Generation",
      description: "Created in 0.8 seconds with Nano Banana's optimized neural engine",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    },
    {
      title: "Instant Garden Creation",
      description: "Complex scene rendered in milliseconds using Nano Banana technology",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop",
    },
    {
      title: "Real-time Beach Synthesis",
      description: "Nano Banana delivers photorealistic results at lightning speed",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop",
    },
    {
      title: "Rapid Aurora Generation",
      description: "Advanced effects processed instantly with Nano Banana AI",
      image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=600&h=400&fit=crop",
    },
  ]

  return (
    <section id="showcase" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-balance">
            Lightning-Fast AI Creations
          </h2>
          <p className="text-lg text-gray-600 text-balance">See what Nano Banana generates in milliseconds</p>
        </div>

        {/* Showcase Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {examples.map((example, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition"
            >
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <img
                  src={example.image || "/placeholder.svg"}
                  alt={example.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute top-3 right-3 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                  Nano Banana Speed
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-2">{example.title}</h3>
                <p className="text-gray-600">{example.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6">Experience the power of Nano Banana yourself</p>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-3 rounded-full transition">
            Try Nano Banana Generator
          </button>
        </div>
      </div>
    </section>
  )
}
