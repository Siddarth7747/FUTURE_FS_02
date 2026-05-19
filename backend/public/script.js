async function addLead(){

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const source = document.getElementById("source").value;
    const status = document.getElementById("status").value;
    const notes = document.getElementById("notes").value;

    await fetch("/addLead",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            name,
            email,
            source,
            status,
            notes
        })

    });

    alert("Lead Added");

    loadLeads();
}

async function loadLeads(){

    const response = await fetch("/leads");

    const data = await response.json();

    let output = "";

    data.forEach((lead)=>{

        output += `
        <div class="lead-card">

        <h3>${lead.name}</h3>

        <p>Email: ${lead.email}</p>

        <p>Source: ${lead.source}</p>

        <p>Status: ${lead.status}</p>

        <p>Notes: ${lead.notes}</p>

        </div>
        `;

    });

    document.getElementById("leadList").innerHTML = output;

}

loadLeads();