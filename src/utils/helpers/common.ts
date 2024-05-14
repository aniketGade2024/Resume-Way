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


export const calculatePercentage = (jobSkills: string[], candidateSkills: string[]) => {
    const candidateSkillsCount = candidateSkills.length;
    let matchedCount = 0;

    candidateSkills.forEach(function (item) {
        if (jobSkills.includes(item)) {
            matchedCount += 1
        }
    });

    const percentage = Math.round((matchedCount / candidateSkillsCount) * 100)

    return (
        percentage
    )

}


export const checkHiddenRoute = (path: string) => {
    const HiddenRoutes = ["/"];
    if (HiddenRoutes.includes(path)) {
        return true
    }
    return false;
}