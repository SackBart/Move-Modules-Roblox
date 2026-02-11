import * as vscode from 'vscode';

const IGNORE_NAME = ".repathignore";

export async function createIgnoreFile() {
    let folder: vscode.WorkspaceFolder | undefined;

    if (!vscode.workspace.workspaceFolders) {
        vscode.window.showErrorMessage("[RePath] No Project open");
        return;
    }

    // If there's only one Project, pick that. Otherwise let the user decide
    if (vscode.workspace.workspaceFolders.length === 1) {
        folder = vscode.workspace.workspaceFolders[0];
    } else {
        folder = await vscode.window.showWorkspaceFolderPick({
            placeHolder: `Pick the project where you want to insert the ${IGNORE_NAME} file`
        });
    }

    if (!folder) { return; } // User did not give a folder


    const uri = vscode.Uri.joinPath(folder.uri, IGNORE_NAME);
    try {
        await vscode.workspace.fs.stat(uri);
        vscode.window.showWarningMessage(`[RePath] ${IGNORE_NAME} already exists`);
        // Still open the file
        const doc = await vscode.workspace.openTextDocument(uri);
        await vscode.window.showTextDocument(doc);
        return; 
    } catch {
        // File doesn't exist
    }

    const defaultContent = [
        "# RePath Ignore File",
        "# Put in the directories you want to ignore from the project root",
        "# Example: Project/ (Will ignore all contents of Project which is inside the project root)"
    ].join('\n');

    try {
        await vscode.workspace.fs.writeFile(uri, new TextEncoder().encode(defaultContent));
        
        vscode.window.showInformationMessage(`[RePath] ${IGNORE_NAME} has been created`);
        
        // Show new file directly
        const doc = await vscode.workspace.openTextDocument(uri);
        await vscode.window.showTextDocument(doc);
        
    } catch (err) {
        vscode.window.showErrorMessage(`[RePath] Couln't create ${IGNORE_NAME} file: ` + err);
    }
}