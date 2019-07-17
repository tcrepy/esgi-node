import React from "react"

export const Actions = ({item, handleDelete}) => <a onClick={(e) => handleDelete(e, item)}>✖</a>;