module.exports = ({ id, fields }) => {
  return {
    id,
    TabName: fields.Title,
    GroupID: fields.GroupID,
    CalendarUrl: fields.CalendarGraphURL,
    SortOrder: fields.Sortorder
  }
}
