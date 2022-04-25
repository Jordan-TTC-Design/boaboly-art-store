import { defineStore } from 'pinia';
import { frontApiMethod } from '@/methods/api.js';
import { statusStore } from '@/stores/statusStore';
const statusData = statusStore();
export const artStore = defineStore({
  id: 'artStore',
  state: () => ({
    arts: [],
    pagination: { totalPages: 1, nowPage: 1 },
  }),
  getters: {},
  actions: {
    getArts() {
      statusData.isLoading = true;
      frontApiMethod.getArts().then((res) => {
        this.arts = JSON.parse(JSON.stringify(res.articles));
        this.pagination = JSON.parse(JSON.stringify(res.pagination));
        statusData.isLoading = false;
      });
    },
    getArtList(pageNum = 1) {
      statusData.isLoading = true;
      frontApiMethod.getArts(pageNum).then((res) => {
        this.pagination.totalPages = res.pagination.total_pages;
        if (res.articles.length > 8) {
          this.pagination.totalPages = res.pagination.total_pages + 1;
        }
        res.articles.forEach((item) => {
          this.arts.push(item);
        });
        if (res.pagination.has_next) {
          this.getArtList(res.pagination.current_page + 1);
        }
        statusData.isLoading = false;
      });
    },
  },
});
