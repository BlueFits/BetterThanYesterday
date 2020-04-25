export function capitalizeWords(text) {
    return(
        text.split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.substring(1))
        .join(" ")
    );
};