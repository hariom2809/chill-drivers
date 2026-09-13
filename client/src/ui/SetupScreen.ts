export type RaceConfig = {
    mode: "Solo" | "Multiplayer";
    totalLaps: number;
    isInfinite: boolean;
};

export class SetupScreen {
    private container: HTMLDivElement;
    private lapContainer: HTMLDivElement;

    constructor() {
        this.container = document.createElement("div");
        this.container.id = "setup-screen";
        
        const title = document.createElement("h1");
        title.textContent = "Race Setup";
        
        const soloButton = document.createElement("button");
        soloButton.textContent = "Solo";
        
        const multiplayerButton = document.createElement("button");
        multiplayerButton.textContent = "Multi Player";
        
        this.lapContainer = document.createElement("div");
        
        this.container.appendChild(title);)
        this.container.appendChild(soloButton);
        this.container.appendChild(multiplayerButton);
        this.container.appendChild(this.lapContainer);
        
        document.body.appendChild(this.container);

        soloButton.addEventListener("click", () => {
            this.showSoloOptions();
        });

        multiplayerButton.addEventListener("click", () => {
            this.showMultiplayerMessage();
        });
    }

    private showSoloOptions() {
        this.lapContainer.innerHTML = "";

        const heading = document.createElement("h2");
        heading.textContent = "Select Laps";

        this.lapContainer.appendChild(heading);

        const lapOptions = [
            {text: "3 Laps", totalLaps 3, isInfinite: false},
            {text: "5 Laps", totalLaps 3, isInfinite: false},
            {text: "10 Laps", totalLaps 3, isInfinite: false},
            {text: "Infinite", totalLaps 0, isInfinite: true},
        ];

        lapOptions.forEach((option) => {
            const button = document.createElement("button");
            button.textContent = option.text;

            button.addEventListener("click", () => {
                console.log("Race Conifd", {
                    mode: "solo",
                    totalLaps: option.totalLaps,
                    isInfinite: option.isInfinite,
                })
            });

            this.lapContainer.appendChild(button);
        });
    }

    private showMultiplayerMessage() {
        this.lapContainer.innerHTML = "";

        const message = document.createElement("p");
        message.textContent = "Multiplayer Mode";

        this.lapContainer.appendChild(message);
    }

}