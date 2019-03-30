/**
 * Function for get paginator
 * @param items
 * @param totalItems
 * @param page
 * @param recordsPerPage
 * @returns {{paginationNo: number, current: number, pages: number, recordsPerPage: number, pageButtonCount: number}}
 */
module.exports.pagination = (items, totalItems, page = 0, recordsPerPage = 15) => {
    const pageButtonCount = Math.ceil(totalItems / recordsPerPage);
    const paginationNo = 0;
    return {
        count: totalItems,
        recordsPerPage,
        pageButtonCount,
        paginationNo,
        current: page,
        pages: Math.ceil(totalItems / recordsPerPage)
    }
};
