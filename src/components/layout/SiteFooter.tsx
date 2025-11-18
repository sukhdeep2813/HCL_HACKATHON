export const SiteFooter = () => (
  <footer className="border-t border-slate-200 bg-white py-8">
    <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
      <p>© {new Date().getFullYear()} WellNest. Preventive care for everyone.</p>
      <div className="flex gap-4">
        <a href="#privacy" className="hover:text-slate-900">
          Privacy
        </a>
        <a href="#terms" className="hover:text-slate-900">
          Terms
        </a>
        <a href="#support" className="hover:text-slate-900">
          Support
        </a>
      </div>
    </div>
  </footer>
);
