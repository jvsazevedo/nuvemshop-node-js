export function Querybuilder(filter: string[]) {
    let query = '?fields=';

    filter.map((value) => {
        query += `${value},`;
    });

    return query.slice(0, -1);
}