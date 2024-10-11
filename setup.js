function setup() {
  const startTime = new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    });

  const formData = { id: 669297, startTime };

  submitData(formData);
}