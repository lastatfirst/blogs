import Link from "next/link";
import HeadingWithUnderline from "../components/HeadingWithUnderline";

export default function SecretPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-6">
        <div className="breadcrumb mb-8 text-lg">
          <Link
            href="/"
            className="text-[#79b8ff] hover:text-white transition-colors"
          >
            home
          </Link>
          <span className="text-white/50 mx-2">/</span>
          <span>secret</span>
        </div>
        <section className="border-b border-white/10 pb-4 mb-4">
          <HeadingWithUnderline
            level={1}
            className="text-3xl mb-3 font-extrabold"
          >
            [weeye]
          </HeadingWithUnderline>
          <p className="text-base mb-3" style={{ color: "#FFFAFA" }}>
            wondering what this strip of pixels on the side is?
          </p>

          <p className="text-base mb-3" style={{ color: "#FFFAFA" }}>
            try finding out the pattern and you shall uncover a special image
            getting formed, here's a small hint for you to get started -
          </p>
        </section>
        <p className="text-base mb-3" style={{ color: "#FFFAFA" }}>
          the final image is thumbnail/cover art for system card of a famous
          image gen model.
        </p>
      </div>
    </div>
  );
}
