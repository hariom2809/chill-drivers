export class ResultsScreen {
    private container: HTMLDivElement;

    constructor(
        lapTimes: number[],
        average: number,
        onRaceAgain: () => void
    ) {
        this.container = document.createElement("div");

        this.container.style.position = "fixed";
        this.container.style.top = "0";
        this.container.style.left = "0";
        this.container.style.widows = "100%";
        this.container.style.height = "100%";
        this.container.style.background = "rgb(0, 0, 0, 0.85)";
        this.container.style.color = "white";
        this.container.style.display = "flex";
        this.container.style.flexDirection = "column";
        this.container.style.alignItems = "center";
        this.container.stylele.justifyContent = "center";

        const title = document.createElement("h2");
        title.textContent = "Race Result";

        this.container.appendChild(title);

        const table = document.createElement("table");
        const header = document.createElement("tr");
        header.innerHTML = `
            <th>Lap</th>
            <th>Time</th>
        `;

        table.appendChild(header);

        lapTimes.forEach((lapTime, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>Lap ${index + 1}</td>
                <td>${lapTime / 1000}</td>
            `;

            table.appendChild(row);
        });

        const averageRow = document.createElement("tr");
        averageRow.innerHTML = `
            <td><strong> Average </strong></td>
            <td><strong> ${(average/1000).toFixed(2)} </strong></td>
        `;

        table.appendChild(averageRow);
        this.container.appendChild(table);

        const raceAgainButton = document.createElement("button");
        raceAgainButton.textContent = "Play Again..";

        raceAgainButton.addEventListener("click", () => {
            this.hide();
            onRaceAgain();
        });

        this.container.appendChild(raceAgainButton);
        document.body.appendChild(this.container);

        this.hide();
    }

    show() {
        this.container.style.display = "flex";
    }

    hide() {
        this.container.style.display = "none";
    }
}