export function mergeProductAndOrderOption(productOptions, selectedOptions) {
    for (const productOption of productOptions) {

        for (const selectedOption of selectedOptions) {

            if (productOption.name === selectedOption.name) {

                for (const value of productOption.values) {

                    if (value.label === selectedOption.value) {

                        value.selected = true;

                    } else {

                        value.selected = false;

                    }

                }

            }

        }

    }

    return productOptions;
}