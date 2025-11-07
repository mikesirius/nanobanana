export default function Reviews() {
  const reviews = [
    {
      name: "AIArtistPro",
      role: "Digital Creator",
      content:
        "This editor completely changed my workflow. The character consistency is incredible - miles ahead of Flux Kontext!",
    },
    {
      name: "ContentCreator",
      role: "UGC Specialist",
      content:
        "Creating consistent AI influencers has never been easier. It maintains perfect face details across edits!",
    },
    {
      name: "PhotoEditor",
      role: "Professional Editor",
      content: "One-shot editing is basically solved with this tool. The scene blending is so natural and realistic!",
    },
  ]

  return (
    <section id="reviews" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-balance">What Creators Are Saying</h2>
          <p className="text-lg text-gray-600 text-balance">Real feedback from real users</p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">
                    ★
                  </span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 mb-6 leading-relaxed">"{review.content}"</p>

              {/* Author */}
              <div className="border-t border-gray-200 pt-4">
                <p className="font-bold text-gray-900">{review.name}</p>
                <p className="text-sm text-gray-600">{review.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
