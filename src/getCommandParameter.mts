import type { APIApplicationCommandAutocompleteInteraction, APIChatInputApplicationCommandInteraction } from "discord-api-types/v10";

export function getCommandParameter(interaction: APIChatInputApplicationCommandInteraction | APIApplicationCommandAutocompleteInteraction, name: string) {
    const options = interaction.data.options;
    if (options == void 0) {
        return null;
    }
    for (let i = 0; i < options.length; i++) {
        const option = options[i];
        if (option.name === name) {
            return option;
        }
    }
    return null;
}
