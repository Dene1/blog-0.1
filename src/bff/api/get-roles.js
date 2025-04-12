export const getRoles = () =>
    fetch("http://localhost:3001/roles")
        .then((loadedRoles) => loadedRoles.json())
        .then((roles) => { // Добавляем еще один .then для обработки ролей
            return roles.map(role => ({
                ...role,
                id: parseInt(role.id, 10)
            }));
        });
