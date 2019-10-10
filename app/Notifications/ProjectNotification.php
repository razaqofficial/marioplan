<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Log;
use \Carbon\Carbon;

class ProjectNotification extends Notification
{
    private $project;

    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($project)
    {
        $this->project = $project;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['broadcast','database'];
    }


    public function toBroadcast($notifiable)
    {
       
        return new BroadcastMessage([
           'title' =>  "New project added ({$this->project->title})",
           'content' => "{$notifiable->name} added {$this->project->title} to the propject repository",
           'date' => Carbon::now()
        ]);
    }

    public function toDatabase($notifiable) {
        return [
            'title' => "New project added ({$this->project->title})",
            'content' => "{$notifiable->name} added {$this->project->title} to the propject repository",
            'date' => Carbon::now()
        ];
    }

}
