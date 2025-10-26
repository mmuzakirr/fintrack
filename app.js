import { createApp } from "vue";

const app = createApp({
  data() {
    return {
      transactions: [],

      form: {
        type: "income",
        category: "",
        amount: null,
        date: new Date().toISOString().split("T")[0], // default tanggal hari ini
      },
    };
  },

  computed: {
    // Hitung total pemasukan
    income() {
      return this.transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);
    },
    // Hitung total pengeluaran
    expense() {
      return this.transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);
    },
  },

  methods: {
    formatCurrency(amount) {
      return "Rp " + amount.toLocaleString("id-ID");
    },

    // Tambah transaksi baru
    addTx() {
      if (!this.form.category || !this.form.amount) {
        alert("Lengkapi semua data transaksi!");
        return;
      }

      const newTx = {
        id: Date.now(),
        ...this.form,
        amount: Number(this.form.amount),
      };

      this.transactions.push(newTx);
      this.saveData();
      this.resetForm();
    },

    // Hapus transaksi
    removeTx(id) {
      if (confirm("Yakin ingin menghapus transaksi ini?")) {
        this.transactions = this.transactions.filter((t) => t.id !== id);
        this.saveData();
      }
    },

    // Reset form
    resetForm() {
      this.form = {
        type: "income",
        category: "",
        amount: null,
        date: new Date().toISOString().split("T")[0],
      };
    },

    // Simpan data ke localStorage
    saveData() {
      localStorage.setItem("fintrack_data", JSON.stringify(this.transactions));
    },

    // Muat data dari localStorage
    loadData() {
      const data = localStorage.getItem("fintrack_data");
      if (data) {
        this.transactions = JSON.parse(data);
      }
    },

    // Reset semua data (demo)
    resetDemo() {
      if (confirm("Hapus semua data transaksi?")) {
        this.transactions = [];
        localStorage.removeItem("fintrack_data");
      }
    },
  },

  mounted() {
    this.loadData(); // otomatis muat data saat halaman dibuka
  },
});

app.mount("#app");
