const loadCards = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => displayLoadCards(data.data));
};

const displayLoadCard = (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/${id}`;
    fetch(url)
    .then((res) => res.json())
    .then((data) => displayLoadCards(data.data));
};

const displayLoadCards = (cards) => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    cards.slice(0, 20).forEach((card) => {
        console.log(card);
        const cardDiv = document.createElement("div");
        
        const priorityColor = card.priority === "high" ? "bg-red-200 text-red-500" : card.priority === "medium" ? "bg-yellow-200 text-yellow-600" : "bg-blue-200 text-blue-500";
        const borderColor = card.status === "open" ? "border-t-green-600" : "border-t-purple-600";
        
        cardDiv.innerHTML = `

        <div class="bg-white rounded-sm shadow-md p-4 border-t-4 ${borderColor}">

           <div class="flex justify-between">
            <img src="../assets/Open-Status.png" alt="">
           <button class="btn btn-soft btn-primary ${priorityColor} rounded-full text-xs">
           ${card.priority.toUpperCase()}
           </button>
           </div>

           <div class="py-2">
            <h2 class="font-bold text-[15px]">${card.title}</h2>
            <p class="text-slate-400 text-[10px]">
            ${card.description.slice(0,60)}...
            </p>
            </div>

            <div class="flex justify-between py-2 gap-1">
                <button class="btn btn-xs bg-red-200 text-red-500 rounded-full border-0 text-[10px]">
                <i class="fa-solid fa-bug"></i> ${card.labels[0]?.toUpperCase() || ""}
                </button>

                <button class="btn btn-xs bg-orange-200 text-orange-400 rounded-full border-0 text-[7px]">
                <i class="fa-regular fa-life-ring"></i> ${card.labels[1]?.toUpperCase() || ""}
                </button>
            </div>
            
            <div class="text-gray-400 border-t pt-2 text-[12px]">
            <p>#${card.id} by ${card.author}</p>
            <p>${new Date(card.createdAt).toLocaleDateString()}</p>
            </div>
        </div>
        
        `;
        
        cardContainer.appendChild(cardDiv);
    });
};

loadCards();