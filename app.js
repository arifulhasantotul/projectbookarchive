// result error message
const resultError = document.getElementById('result_error');
// search error message 
const searchError = document.getElementById('search_error');
// total result message 
const totalResult = document.getElementById('total_found');
// search loader icon 
const searchLoader = document.getElementById('loader');

// api fetch function 

const searchBook = async () => {
    // search loader on 
    searchLoader.style.display = 'block';
    // search and result error msg off 
    searchError.style.display = 'none';
    resultError.style.display = 'none';

    // access input id 
    const inputId = document.getElementById('input_field');
    // get input value 
    const inputValue = inputId.value;
    
    
    // clear row text
    document.getElementById('row').innerHTML = '';
    totalResult.textContent = '';

    // blank search error handle condition
    if (inputId.value !== '') {
        // api url 
        const url = `https://openlibrary.org/search.json?q=${inputValue}`;
        // get data 
        const fetchData = await fetch(url);
        // response data 
        const data = await fetchData.json();
        // call function with data 
        showBook(data);

    } else {
        // blank search error msg on 
        searchError.style.display = 'block';
        // search loader, result error msg, total result msg off 
        searchLoader.style.display = 'none';
        resultError.style.display = 'none';
        totalResult.style.display = 'none';
    }

    // clear input field 
    inputId.value = '';
}

const showBook = bookList => {

    document.getElementById('input_field').value = '';
    // no result found handle condition
    if (bookList.numFound !== 0) {
        
        // total result on, result error msg off 
        totalResult.style.display = 'block';
        resultError.style.display = 'none';
        
        // create div and show div to html page
        const div = document.createElement('div');
        div.innerHTML = `
            <h3 class="text-center my-5">Total result found : ${bookList.numFound}</h3>
        `;
        totalResult.appendChild(div);
        
        // books declare 
        const books = bookList.docs;

        // target row 
        const row = document.getElementById('row');
        // clear row 
        row.textContent = '';
        
        // using forEach and arrow func
        books?.forEach(book => {
            // create div 
            const div = document.createElement('div');
            // write div text 
            div.innerHTML = `
            <div class="col">
                <div class="card mt-4 overflow-hidden mx-auto rounded-3" style="width:200px; height:500px">
                <img style="width:200px; height:230px;" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">Name : ${book.title}</h5>
                        <h6> Author : ${book.author_name? book.author_name[0] : 'No Name Available'}</h6>
                        <p class="card-text">First Published : ${book.first_publish_year? book.first_publish_year : 'No Year Available'}</p>
                        <h6>Publisher : ${book.publisher? book.publisher[0] : 'No Publisher Available'}</h6>
                    </div>
                </div>
            </div>
            `;
            // show div to html page 
            row.appendChild(div);

            // search loader off 
            searchLoader.style.display = 'none';
        });
    } else {
        // no found msg on 
        resultError.style.display = 'block';
        // total result and search loader off 
        totalResult.style.display = 'none';
        searchLoader.style.display = 'none';
    }
    
}
