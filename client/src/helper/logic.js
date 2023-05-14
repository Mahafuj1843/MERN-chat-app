export const getSender = (users, loggedUser) =>{
    return users[0]._id === loggedUser._id ? users[1] : users[0]
}

export const getOnline = (items, onlineUsers, loggedUser) => {
    return(
     (items.isGroupChat && onlineUsers.some(ou => items.users.find(u=>ou.userId===(u._id!==loggedUser._id?u._id:'')))) 
     ||
     (!items.isGroupChat && onlineUsers.find((u)=>u.userId===getSender(items.users, loggedUser)._id))
    )
 }