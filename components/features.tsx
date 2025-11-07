export default function Features() {
  const features = [
    {
      icon: "💬",
      title: "Natural Language Editing",
      description:
        "Edit images using simple text prompts. Nano-banana AI understands complex instructions like GPT for images",
    },
    {
      icon: "👤",
      title: "Character Consistency",
      description:
        "Maintain perfect character details across edits. This model excels at preserving faces and identities",
    },
    {
      icon: "🎨",
      title: "Scene Preservation",
      description: "Seamlessly blend edits with original backgrounds. Superior scene fusion compared to Flux Kontext",
    },
    {
      icon: "⚡",
      title: "One-Shot Editing",
      description:
        "Perfect results in a single attempt. Nano-banana solves one-shot image editing challenges effortlessly",
    },
    {
      icon: "🖼️",
      title: "Multi-Image Context",
      description: "Process multiple images simultaneously. Support for advanced multi-image editing workflows",
    },
    {
      icon: "📱",
      title: "AI UGC Creation",
      description: "Create consistent AI influencers and UGC content. Perfect for social media and marketing campaigns",
    },
  ]

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-balance">Why Choose Nano Banana?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-balance">
            Nano-banana is the most advanced AI image editor. Revolutionize your photo editing with natural language
            understanding
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:border-yellow-300 hover:shadow-lg transition"
            >
              <span className="text-4xl mb-4 block">{feature.icon}</span>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
