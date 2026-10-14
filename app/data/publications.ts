// =============================================================================
// Daftar publikasi ilmiah yang tampil di bagian "Publikasi".
// Sumber: ORCID 0009-0004-2748-8509. Edit file ini untuk menambah/mengubah.
//
// - title   : judul publikasi
// - venue   : nama jurnal / konferensi
// - year    : tahun terbit
// - type    : "Jurnal" | "Prosiding" | dll (tampil sebagai label)
// - role    : (opsional) "Penulis pertama" / "Co-author" dsb.
// - doi     : (opsional) DOI (tanpa "https://doi.org/")
// - url     : tautan ke publikasi
// =============================================================================

export type Publication = {
  title: string;
  venue: string;
  year: string;
  type: string;
  role?: string;
  doi?: string;
  url: string;
};

export const publications: Publication[] = [
  {
    title:
      "Leveraging a Hybrid Fuzzy C-Means–PCA Model for Identifying Speech Therapy Needs in Children",
    venue: "Journal of Data Science and Intelligent Systems",
    year: "2026",
    type: "Jurnal",
    role: "Penulis pertama",
    doi: "10.47852/bonviewJDSIS62028311",
    url: "https://doi.org/10.47852/bonviewJDSIS62028311",
  },
  {
    title:
      "Hybrid PCA–FCM Clustering for Provincial Rice Distribution Classification in Indonesia",
    venue: "International Journal of Sustainable Development and Planning",
    year: "2026",
    type: "Jurnal",
    role: "Co-author",
    doi: "10.18280/ijsdp.210613",
    url: "https://doi.org/10.18280/ijsdp.210613",
  },
  {
    title:
      "International Conference on Innovation in Business and Economics (ICBE 2026) — Conference Proceedings",
    venue: "ICBE 2026, Tokyo",
    year: "2026",
    type: "Prosiding",
    role: "Pemakalah",
    doi: "10.5281/zenodo.19626421",
    url: "https://zenodo.org/doi/10.5281/zenodo.19626421",
  },
];

export const orcidUrl = "https://orcid.org/0009-0004-2748-8509";
