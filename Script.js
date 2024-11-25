const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')


const APIURL = 'https://api.github.com/users/';


async function getUser(username){
    try{
        const {data} = await axios(APIURL + username);

       createUserCard(data);
    }catch(err){
        if(err.response.status == 404){
            CreateErrorCard('NO profile with this userName found!')
        }
    }

}

function createUserCard(user){
    const strOut = `<div class="card">
            <div>
                <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
                <div class="user-info">
                    <h2>${user.name}</h2>
                    <p>${user.bio}</p>

                    <ul>
                        <li>${user.followers} <strong>Followers</strong></li>
                        <li>${user.following} <strong>Following</strong></li>
                        <li>${user.public_repos} <strong>Repos</strong></li>
                    </ul>

                    <div id="repos">
                    </div>
                </div>
            </div>
        </div>`
        main.innerHTML = strOut;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const user = search.value;

    if(user){
        getUser(user);

        search.value = '';
    }
})


function CreateErrorCard(msg){
    const strOut = `
    <div class="card">
    <h1>${msg}</h1>
    </div>
    `

    main.innerHTML = strOut;
}