const TipsFooter = () => (
  <section className="mt-8 rounded-2xl border border-white/5 bg-slate-900/40 p-5 text-sm text-slate-300">
    <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
      Tips Fisika
    </h2>
    <ul className="mt-3 list-disc space-y-1 pl-5">
      <li>
        Sudut 45° memberi jarak horizontal maksimum pada permukaan datar (dengan
        gravitasi konstan).
      </li>
      <li>
        Tinggi maksimum hanya dipengaruhi oleh komponen vertikal kecepatan awal
        dan gravitasi.
      </li>
      <li>
        Kecepatan akhir saat menyentuh tanah memiliki besar yang sama dengan
        kecepatan awal jika lantai berada pada ketinggian yang sama.
      </li>
    </ul>
  </section>
);

export default TipsFooter;

