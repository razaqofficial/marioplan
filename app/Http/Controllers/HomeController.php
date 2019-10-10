<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectRequest;
use Illuminate\Http\Request;
use App\Project;
use App\User;
use Auth;
use App\Notifications\ProjectNotification;
use App\Notifications\LikeNotification;
use Log;


class HomeController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api')->except('index');
    }

    public function index()
    {
        return view('home');
    }

    public function createProject(ProjectRequest $request)
    {
        $input = $request->all();
        $project = auth()->user()->projects()->create($input);
       // $project->user->notify(new ProjectNotification($project));
        return response()->json($project,200);
    }

    public function allProjects()
    {
        $projects = Project::all();
        return response()->json($projects,200);
    }

    public function findProject(Request $request)
    {
       
        $project = Project::with('user')->findOrFail($request->project_id);
       

        return response()->json($project,200);
    }

    public function likeProject(Request $request)
    {
        $project = Project::with('user')->findOrFail($request->project_id);
        $project->user->notify(new LikeNotification($project));
        return response()->json($project,200);

    }

    public function getNotifications()
    {
        $notifications = auth()->user()->notifications;
        $allNotifications = [];
        foreach ($notifications as $notification) {
           $allNotifications[] = [
                'title' => $notification->data['title'],
                'content' => $notification->data['content'],
                'date' =>  $notification->data['date'],
                'id' => $notification->id,
                'type' => $notification->type
           ];
        }
        return response()->json($allNotifications,200);
    }
}
