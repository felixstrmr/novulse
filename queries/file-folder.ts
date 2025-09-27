import { and, eq, isNull } from "drizzle-orm";
import React from "react";
import { db } from "@/db";
import { workspaces } from "@/db/schema";
import { fileFolders } from "@/db/schema/file-folders";

export const getFileFolders = React.cache(async (domain: string) => {
  const data = await db
    .select({
      id: fileFolders.id,
      name: fileFolders.name,
      path: fileFolders.path,
      parentFolderId: fileFolders.parentFolderId,
      createdAt: fileFolders.createdAt,
      updatedAt: fileFolders.updatedAt,
      workspaceId: fileFolders.workspaceId,
    })
    .from(fileFolders)
    .innerJoin(workspaces, eq(fileFolders.workspaceId, workspaces.id))
    .where(eq(workspaces.domain, domain));

  return data;
});

export const getRootFileFolders = React.cache(async (domain: string) => {
  const data = await db
    .select({
      id: fileFolders.id,
      name: fileFolders.name,
      path: fileFolders.path,
    })
    .from(fileFolders)
    .innerJoin(workspaces, eq(fileFolders.workspaceId, workspaces.id))
    .where(
      and(eq(workspaces.domain, domain), isNull(fileFolders.parentFolderId))
    );

  return data;
});
