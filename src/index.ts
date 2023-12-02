// main.js

import axios from "axios";
import "./style.css";
const userDetails:HTMLDivElement = document.querySelector(".first")!;
const con:HTMLDivElement = document.querySelector("tr")!;

const URL = "https://jsonplaceholder.typicode.com/users";
const dataContainer: HTMLDivElement = document.querySelector(".data-container")!;
let usersData: any[] = [];

async function fetchData() {
    try {
        const response = await axios.get(URL);
        usersData = response.data;
        displayUserData(usersData);
    } catch (error) {
        console.error(error);
    }
}

function displayUserData(data: any[]) {
    dataContainer.innerHTML = "";


    data.forEach((user, index) => {
        const row = document.createElement("tr");
        row.id = `row-${index + 1}`;
        row.classList.add("data-row");

        const idCell = document.createElement("td");
        idCell.innerText = `${index + 1}`;

        const nameCell = document.createElement("td");
        nameCell.innerText = user.name;

        const emailCell = document.createElement("td");
        emailCell.innerText = user.email;

        const phoneCell = document.createElement("td");
        phoneCell.innerText = user.phone;

        const actionCell = document.createElement("td");

        const eyeIcon = document.createElement("img");
        eyeIcon.src = "https://www.freeiconspng.com/thumbs/eye-icon/eyeball-icon-png-eye-icon-1.png";
        eyeIcon.className = "img";
        eyeIcon.addEventListener("click", () => {
            showUserDetails(index + 1);
            dataContainer.style.display = "none";

            const back:HTMLDivElement = document.querySelector(".back");
            back.style.display = "block";

            back.addEventListener("click", () =>{
            dataContainer.style.display = "block";
            back.style.display = "none";
            userDetails.style.display="none";

                con.style.display="none";



            })

        });

        actionCell.appendChild(eyeIcon);

        const deleteIcon = document.createElement("img");
        deleteIcon.src = "https://cdn-icons-png.flaticon.com/512/1345/1345874.png";
        deleteIcon.className = "img1";
        deleteIcon.addEventListener("click", () => deleteUser(index + 1));
        actionCell.appendChild(deleteIcon);

        row.appendChild(idCell);
        row.appendChild(nameCell);
        row.appendChild(emailCell);
        row.appendChild(phoneCell);
        row.appendChild(actionCell);

        dataContainer.appendChild(row);
    });
}

function showUserDetails(index: number) {
    const user = usersData[index - 1];
    userDetails.style.display="block";


    userDetails.innerHTML = `
        <table>
            <tr>
                <td>Name</td>
                <td>${user.name}</td>
            </tr>
            <tr>
                <td>ID</td>
                <td>${user.id}</td>
            </tr>
            <tr>
                <td>Email</td>
                <td>${user.email}</td>
            </tr>
            <tr>
                <td>User Name</td>
                <td>${user.username}</td>
            </tr>
            <tr>
                <td>Phone</td>
                <td>${user.phone}</td>
            </tr>
            <tr>
                <td>Website</td>
                <td>${user.website}</td>
            </tr>
        </table>`;
}

function deleteUser(index: number) {
    const deletedUserIndex = index - 1;
    usersData.splice(deletedUserIndex, 1);
    displayUserData(usersData);

    console.log("Deleted user index:", deletedUserIndex);


    usersData.forEach((user, index) => {
        console.log(`Index ${index + 1}:`, user);
    });
}

fetchData();
