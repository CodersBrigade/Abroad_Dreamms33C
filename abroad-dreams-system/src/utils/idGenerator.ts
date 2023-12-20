// utils/idGenerator.ts
let currentId = 1; // Initial ID value

export const generateId = (): number => {
    const newId = currentId;
    currentId += 1;
    return newId;
};
