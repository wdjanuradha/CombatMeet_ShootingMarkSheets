// Function to initialize the form for 10 shooters
function initShooterProfiles() {
    let memberScores = document.getElementById('memberScores');
    for (let i = 1; i <= 10; i++) {
        let profileForm = `
            <div class="shooter-profile">
                <h3>Shooter ${i} Profile</h3>
                <label for="name${i}">Name:</label>
                <input type="text" id="name${i}" placeholder="Enter name" required>
                <label for="rank${i}">Rank:</label>
                <select id="rank${i}">
                    <option value="Lt Col">Lt Col</option>
                    <option value="Maj">Maj</option>
                    <option value="Capt">Capt</option>
                    <option value="Lt">Lt</option>
                    <option value="2Lt">2Lt</option>
                    <option value="WOI">WOI</option>
                    <option value="WOII">WOII</option>
                    <option value="S/Sgt">S/Sgt</option>
                    <option value="Sgt">Sgt</option>
                    <option value="Cpl">Cpl</option>
                    <option value="Lcpl">Lcpl</option>
                    <option value="Infmn">Infmn</option>
                </select>
                
                <h4>Shooting Rounds Hit</h4>
                <label>300m (A/B):</label>
                <input type="number" id="rounds300mA${i}" placeholder="A" min="0" max="10">
                <input type="number" id="rounds300mB${i}" placeholder="B" min="0" max="10"><br>

                <label>200m Figure 11 (A/B):</label>
                <input type="number" id="rounds200m11A${i}" placeholder="A" min="0" max="10">
                <input type="number" id="rounds200m11B${i}" placeholder="B" min="0" max="10"><br>

                <label>200m Figure 12 (A):</label>
                <input type="number" id="rounds200m12A${i}" placeholder="A" min="0" max="10"><br>

                <label>100m (A/B):</label>
                <input type="number" id="rounds100mA${i}" placeholder="A" min="0" max="10">
                <input type="number" id="rounds100mB${i}" placeholder="B" min="0" max="10"><br>

                <label>50m (A/B):</label>
                <input type="number" id="rounds50mA${i}" placeholder="A" min="0" max="10">
                <input type="number" id="rounds50mB${i}" placeholder="B" min="0" max="10"><br>

                <label>Total Marks:</label>
                <input type="text" id="totalMarks${i}" readonly><br>

                <hr>
            </div>
        `;
        memberScores.innerHTML += profileForm;
    }
}

// Function to calculate the marks for each shooter and generate reports
function calculateTotal() {
    let teamTotal = 0;
    let historyReport = document.getElementById('historyReport');
    historyReport.innerHTML = ""; // Clear previous reports

    for (let i = 1; i <= 10; i++) {
        // Get shooter information
        let name = document.getElementById(`name${i}`).value;
        let rank = document.getElementById(`rank${i}`).value;

        // Get rounds hit for A and B areas at each distance
        let rounds300mA = parseInt(document.getElementById(`rounds300mA${i}`).value) || 0;
        let rounds300mB = parseInt(document.getElementById(`rounds300mB${i}`).value) || 0;

        let rounds200m11A = parseInt(document.getElementById(`rounds200m11A${i}`).value) || 0;
        let rounds200m11B = parseInt(document.getElementById(`rounds200m11B${i}`).value) || 0;

        let rounds200m12A = parseInt(document.getElementById(`rounds200m12A${i}`).value) || 0;

        let rounds100mA = parseInt(document.getElementById(`rounds100mA${i}`).value) || 0;
        let rounds100mB = parseInt(document.getElementById(`rounds100mB${i}`).value) || 0;

        let rounds50mA = parseInt(document.getElementById(`rounds50mA${i}`).value) || 0;
        let rounds50mB = parseInt(document.getElementById(`rounds50mB${i}`).value) || 0;

        // Calculate total marks for the shooter
        let totalMarks = (rounds300mA * 5) + (rounds300mB * 3) +
                         (rounds200m11A * 5) + (rounds200m11B * 3) +
                         (rounds200m12A * 5) +
                         (rounds100mA * 5) + (rounds100mB * 3) +
                         (rounds50mA * 5) + (rounds50mB * 3);

        // Display total marks for the shooter
        document.getElementById(`totalMarks${i}`).value = totalMarks;

        // Add shooter's marks to team total
        teamTotal += totalMarks;

        // Generate history and improvement report
        let report = `
            <h4>${name} (${rank})</h4>
            <p>Total Marks: ${totalMarks}</p>
            <p>300m - A: ${rounds300mA}, B: ${rounds300mB}</p>
            <p>200m Figure 11 - A: ${rounds200m11A}, B: ${rounds200m11B}</p>
            <p>200m Figure 12 - A: ${rounds200m12A}</p>
            <p>100m - A: ${rounds100mA}, B: ${rounds100mB}</p>
            <p>50m - A: ${rounds50mA}, B: ${rounds50mB}</p>
        `;
        historyReport.innerHTML += report;

        // Check for Marksmanship Badge eligibility
        if (totalMarks >= 200) {
            historyReport.innerHTML += `<p><strong>Eligible for Marksmanship Badge!</strong></p>`;
        } else {
            historyReport.innerHTML += `<p><strong>Not eligible for Marksmanship Badge.</strong></p>`;
        }

        historyReport.innerHTML += `<hr>`;
    }

    // Display the total team score
    document.getElementById('teamTotal').innerText = `${teamTotal} / 2500`;
}

// Initialize shooter profiles when the page loads
window.onload = initShooterProfiles;
