import { and, eq } from "drizzle-orm";
import React from "react";
import { db } from "@/db";
import { files, workspaces } from "@/db/schema";

export const getFiles = React.cache(async (domain: string) => {
  const data = await db
    .select({
      id: files.id,
      name: files.name,
      path: files.path,
      type: files.type,
      size: files.size,
      folderId: files.folderId,
      createdAt: files.createdAt,
      updatedAt: files.updatedAt,
      workspaceId: files.workspaceId,
    })
    .from(files)
    .innerJoin(workspaces, eq(files.workspaceId, workspaces.id))
    .where(eq(workspaces.domain, domain));

  return data;
});

export const getFilesByFolderId = React.cache(
  async (domain: string, folderId: string) => {
    const data = await db
      .select({
        id: files.id,
        name: files.name,
        path: files.path,
        type: files.type,
        size: files.size,
        folderId: files.folderId,
        createdAt: files.createdAt,
        updatedAt: files.updatedAt,
        workspaceId: files.workspaceId,
      })
      .from(files)
      .innerJoin(workspaces, eq(files.workspaceId, workspaces.id))
      .where(and(eq(workspaces.domain, domain), eq(files.folderId, folderId)));

    return data;
  }
);
