export function meta(message, status) {
    return {"message" : message, "status" : status}
}

export function dataMeta(data, meta) {
    return {"data" : data, "meta" : meta}
}