document.addEventListener('DOMContentLoaded', () => {

    const searchInput =
        document.getElementById('recordSearch');

    const migrationFilter =
        document.getElementById('migrationFilter');

    const typeFilter =
        document.getElementById('typeFilter');

    const reportFilter =
        document.getElementById('reportFilter');

    const clearFilters =
        document.getElementById('clearFilters');

    const rows =
        document.querySelectorAll('.record-row');


    function filterRecords() {

        const searchTerm =
            searchInput.value
                .toLowerCase()
                .trim();

        const migrationValue =
            migrationFilter.value;

        const typeValue =
            typeFilter.value;

        const reportValue =
            reportFilter.value;


        rows.forEach((row) => {

            const title =
                row.dataset.title.toLowerCase();

            const agency =
                row.dataset.agency.toLowerCase();

            const type =
                row.dataset.type;

            const report =
                row.dataset.report;

            const migration =
                row.dataset.migration;


            const matchesSearch =
                title.includes(searchTerm) ||
                agency.includes(searchTerm) ||
                type.toLowerCase().includes(searchTerm);


            const matchesMigration =
                migrationValue === 'all' ||
                migration === migrationValue;


            const matchesType =
                typeValue === 'all' ||
                type === typeValue;


            const matchesReport =
                reportValue === 'all' ||
                report === reportValue;


            if (
                matchesSearch &&
                matchesMigration &&
                matchesType &&
                matchesReport
            ) {

                row.style.display = '';

            } else {

                row.style.display = 'none';

            }

        });

    }


    searchInput.addEventListener(
        'input',
        filterRecords
    );


    migrationFilter.addEventListener(
        'change',
        filterRecords
    );


    typeFilter.addEventListener(
        'change',
        filterRecords
    );


    reportFilter.addEventListener(
        'change',
        filterRecords
    );


    clearFilters.addEventListener(
        'click',
        () => {

            searchInput.value = '';
            migrationFilter.value = 'all';
            typeFilter.value = 'all';
            reportFilter.value = 'all';

            filterRecords();

        }
    );

});