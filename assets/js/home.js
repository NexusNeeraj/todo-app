const checkboxes = document.querySelectorAll('.todo-checkbox');
const deleteLink = document.querySelector('.delete-link');

checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    const checkedCheckboxes = document.querySelectorAll('.todo-checkbox:checked');
    const selectedIds = Array.from(checkedCheckboxes).map(checkbox => checkbox.value);

    if (selectedIds.length > 0) {
      // If at least one checkbox is checked, enable the "Delete" link.
      deleteLink.href = `/delete/?items=${selectedIds.join(',')}`;
    } else {
      // If no checkboxes are checked, disable the "Delete" link.
      deleteLink.href = 'javascript:void(0);';
    }
  });
});
