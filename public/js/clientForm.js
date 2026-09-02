document.addEventListener('DOMContentLoaded', () => {

    const form = document.querySelector('form');

    const providedYes = document.getElementById('providedYes');
    const providedNo = document.getElementById('providedNo');

    const providedHow = document.getElementById('providedHow');
    const providedHowContainer =
    document.getElementById('providedHowContainer');

    const actionSelect = document.getElementById('actionTaken');


    // ----------------------------------------
    // Show / hide "Provided How"
    // ----------------------------------------

    function updateProvidedHowVisibility() {

        if (providedYes.checked) {

            providedHowContainer.style.display = 'block';
            providedHow.disabled = false;

        } else {

            providedHowContainer.style.display = 'none';
            providedHow.disabled = true;
            providedHow.value = '';

        }

    }


    providedYes.addEventListener('change', updateProvidedHowVisibility);
    providedNo.addEventListener('change', updateProvidedHowVisibility);

    updateProvidedHowVisibility();


    // ----------------------------------------
    // Prevent negative hours
    // ----------------------------------------

    const hoursSpent = document.getElementById('hoursSpent');

    hoursSpent.addEventListener('input', () => {

        if (hoursSpent.value < 0) {
            hoursSpent.value = 0;
        }

    });


    // ----------------------------------------
    // Make multi-select easier to use
    // ----------------------------------------

    actionSelect.addEventListener('mousedown', function(event) {

        event.preventDefault();

        const option = event.target;

        if (option.tagName === 'OPTION') {

            option.selected = !option.selected;

        }

    });


    // ----------------------------------------
    // Basic form validation
    // ----------------------------------------

    form.addEventListener('submit', (event) => {

        let valid = true;

        const requiredFields = [
            'title',
            'requestReceived',
            'started',
            'typeOfInvestigation',
            'hoursSpent',
            'softwareUsed',
            'evidenceStored'
        ];


        requiredFields.forEach((fieldId) => {

            const field = document.getElementById(fieldId);

            if (!field.value.trim()) {

                field.classList.add('is-invalid');
                valid = false;

            } else {

                field.classList.remove('is-invalid');

            }

        });


        // Make sure at least one action is selected

        const selectedActions = Array.from(actionSelect.selectedOptions);

        if (selectedActions.length === 0) {

            actionSelect.classList.add('is-invalid');
            valid = false;

        } else {

            actionSelect.classList.remove('is-invalid');

        }


        // Make sure software license status is selected

        const paidOrFree =
            document.querySelector('input[name="paidOrFree"]:checked');

        if (!paidOrFree) {

            valid = false;

            alert('Please select the software license status.');

        }


        // Make sure report complete is selected

        const reportComplete =
            document.querySelector('input[name="reportComplete"]:checked');

        if (!reportComplete) {

            valid = false;

            alert('Please select whether the report is complete.');

        }


        // Make sure investigator delivery status is selected

        const provided =
            document.querySelector(
                'input[name="providedToInvestigator"]:checked'
            );

        if (!provided) {

            valid = false;

            alert('Please select whether the report was provided to the investigator.');

        }


        if (!valid) {

            event.preventDefault();

            const firstInvalid =
                document.querySelector('.is-invalid');

            if (firstInvalid) {

                firstInvalid.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });

                firstInvalid.focus();

            }

        }

    });


    // ----------------------------------------
    // Remove red validation when corrected
    // ----------------------------------------

    document.querySelectorAll(
        'input, select, textarea'
    ).forEach((field) => {

        field.addEventListener('input', () => {

            field.classList.remove('is-invalid');

        });

        field.addEventListener('change', () => {

            field.classList.remove('is-invalid');

        });

    });

});