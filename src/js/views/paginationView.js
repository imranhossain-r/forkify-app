import { View } from './view.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //* Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateButtonMarkup('next');
    }
    //* Last page
    if (curPage === numPages && numPages > 1) {
      return this._generateButtonMarkup('prev');
    }
    //* Other page
    if (curPage < numPages) {
      return [
        this._generateButtonMarkup('next'),
        this._generateButtonMarkup('prev'),
      ].join('');
    }
    //* Page 1, and there are no other pages
    return '';
  }

  _generateButtonMarkup(type) {
    const curPage = this._data.page;
    //prettier-ignore
    return `
          <button data-goto="${type === 'next' ? curPage + 1 : curPage - 1}" class="btn--inline pagination__btn--${type}">
            <span>Page ${type === 'next' ? curPage + 1 : curPage - 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-${type === 'next' ? 'right' : 'left'}"></use>
            </svg>
          </button>
    `;
  }
}

export default new PaginationView();
