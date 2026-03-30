const isAdminManagingOwnUserScope = (adminId, targetUser) => {
  if (!adminId || !targetUser || !targetUser.createdBy) return false;
  return String(targetUser.createdBy) === String(adminId);
};

module.exports = {
  isAdminManagingOwnUserScope,
};

