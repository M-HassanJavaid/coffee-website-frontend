export function getSelectedOptionsWithPrice(productOptions , selectedOptions) {


    for (const selectedOption of selectedOptions) {
        
        let currentSelectedOptionName = selectedOption.name;
        let currentProductOptionValue = selectedOption.value;

        if (currentProductOptionValue === '') {
            selectedOption.price = 0;
            continue;
        }

        for (const productOption of productOptions) {

            if (currentSelectedOptionName === productOption.name) {
                
                for (const value of productOption.values) {
                    
                    if (value.label === currentProductOptionValue) {
                        
                        selectedOption.price = value.extraPrice;
                        break;

                    }

                }

                break;

            }

        }

    }

    return selectedOptions;
}