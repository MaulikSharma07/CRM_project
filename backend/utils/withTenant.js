const prisma = require("../lib/prisma");

async function withTenant(tenantId, callback) {
  return prisma.$transaction(async (tx) => {
    await tx.$executeRaw`
      SELECT set_config(
        'app.current_tenant_id',
        ${tenantId},
        true
      )
    `;

    return callback(tx);
  });
}

module.exports = withTenant;