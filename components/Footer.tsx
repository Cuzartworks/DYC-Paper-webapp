export function Footer() {
  return (
    <footer className="border-t border-[#E6E6E6] bg-white">
      <div className="mx-auto flex h-[79px] max-w-[1440px] items-center justify-between px-4 md:px-8 xl:px-16">
        <p className="text-sm text-[#0D0D0D]">
          © 2026 DYC paper — Draw Your Creativity
        </p>

        <div className="flex items-center gap-6 text-sm text-[#0D0D0D]">
          <a
            href="https://www.instagram.com/dyc_paper?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 transition-opacity hover:opacity-60"
            aria-label="DYC PAPER on Instagram"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7">
              <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5" />
              <circle cx="12" cy="12" r="4.1" />
              <circle cx="17.5" cy="6.7" r="1" fill="currentColor" stroke="none" />
            </svg>
            <span>Instagram</span>
          </a>
          <span aria-label="Hashtag">#DYCpaper</span>
        </div>
      </div>
    </footer>
  );
}
