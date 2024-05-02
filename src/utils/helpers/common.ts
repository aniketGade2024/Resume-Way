export const convertToBase64 = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject;
})

export const matchSkills = (jobSkills: string[], candidateSkills: string[]) => {
    const candidateSkillsCount = candidateSkills.length;
    let matchedCount = 0;

    candidateSkills.forEach(function (item) {
        if (jobSkills.includes(item)) {
            matchedCount += 1
        }
    });

    return (`${matchedCount} / ${candidateSkillsCount} `)
}