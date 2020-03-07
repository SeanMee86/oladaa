/**
 * @type {{Sports & Fitness: number, Dance: number, Outdoors & Adventures: number, Health & Wellness: number, Music: number, Pets: number, Social: number, Photography: number, Arts: number, Hobbies & Crafts: number, Sci-Fi & Games: number, Film: number}}
 */
const ids= {
    'Sports & Fitness': 1,
    'Dance': 2,
    'Outdoors & Adventures': 3,
    'Health & Wellness': 4,
    'Music': 5,
    'Pets': 6,
    'Social': 7,
    'Photography': 8,
    'Arts': 9,
    'Hobbies & Crafts': 10,
    'Sci-Fi & Games': 11,
    'Film': 12
};
/**
 * @param choices
 * @returns {Array}
 */
export default function(choices){
    const output = [];
    for(const cat in choices){
        if(choices[cat] && ids[cat]){
            output.push(ids[cat]);
        }
    }
    return output;
}